import { Box, Flex, Grid, GridItem, Input, SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import SingleCard from "./SingleCard";
const Home = () => {
  const [data, setData] = useState([]);
  const [type, setType] = useState("");
  
  useEffect(() => {
    axios.get(`https://api.spacexdata.com/v3/capsules`).then((res) => {
      
      setData(res.data);
    });
  }, []);
  return (
    <>
    <Flex margin="20px">
    <Input />
    <Input />
    <Input />
    </Flex>
    
    <Grid templateColumns='repeat(8, 1fr)'  w={[300, 400, 500]} gap={2} margin="20px">
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
    </>
  );
};

export default Home;
