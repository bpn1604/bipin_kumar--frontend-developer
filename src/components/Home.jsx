import { Box, Button, Flex, Grid, GridItem, Input, SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import SingleCard from "./SingleCard";
const Home = () => {
  const [data, setData] = useState([]);
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);
  
  useEffect(() => {
    axios.get(`https://api.spacexdata.com/v3/capsules?user_id=714830764&start=2017-06-22&end=2017-06-25&type=${text}&offset=${page}&page_size=10&rfq_status=Published`).then((res) => {
      
      setData(res.data);
    });
  }, []);
  const handlesearch = () => {
    axios
      .get(
        `https://apitest.vendosmart.com//seller/seller_rfq_list?user_id=714830764&start_date=&end_date=&search_key=${text}&page_number=1&page_size=10&rfq_status=Published`
      )
      .then((res) => setData(res.data.rfq_list));
  };
  return (
    <>
    <Input
        htmlSize={4}
        width="auto"
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your text"
      />
      <Input
        placeholder="Select Date and Time"
        size="sm"
        type="datetime-local"
        width="500px"
        height="40px"
      />
      <Input
        placeholder="Select Date and Time"
        size="sm"
        type="datetime-local"
        width="500px"
        height="40px"
      />
      <Button onClick={handlesearch}>Search</Button>
    
    <Grid templateColumns='repeat(8, 1fr)'   gap={2} margin="20px">
      {
        data && data.map(({
          id,
          type,
          status,
          serial,
          launches,
          last_update,
          land_landings,
          water_landings,
          reuse_count,
          original_launch,
        })=>(
          <GridItem colSpan={2} h='60' backgroundColor="teal.100" padding="5px" >
            <article key={id} className="articles">
                  <h2 className="text-xl font-bold mb-5">
                    Type : {type},{" "}
                    <span className="text-base opacity-75 font-light">
                      {serial}
                    </span>
                  </h2>
                  <ul>
                    
                    <li className="mb-1">{land_landings} land landings</li>
                    <li className="mb-1">{water_landings} water landings</li>
                    <li className="mb-1">Reused {reuse_count} times</li>
                    
                    {status === "active" ? (
                      <li className="text-emerald-500">Active</li>
                    ) : (
                      <li className="text-rose-500">Retired</li>
                    )}
                    <li> Orinigal_Launch : { new Date(original_launch).toUTCString()}</li>
                  </ul>

                  <p className="mt-5 opacity-75">{last_update}</p>
                </article>
          </GridItem>
        ))
      }
  
  
</Grid>
<Flex justifyContent="flex-end" marginRight="10px" marginTop="10px">
      <Button disabled={page===1} onClick={(e)=>setPage((page)=>page-1)}>Prev</Button>
        ...
        
        <Button disabled={page===1} onClick={(e)=>setPage((page)=>page-1)} >{page-1}</Button>
        .
        <Button>{page}</Button>
        .
        <Button onClick={(e)=>setPage((page)=>page+1)}>{page+1}</Button>
        ... <Button disabled={page===50} onClick={(e)=>setPage((page)=>page+1)}>Next</Button>
        </Flex>
    
    </>
  );
};

export default Home;
