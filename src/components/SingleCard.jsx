import { Box } from '@chakra-ui/react'
import React from 'react'

const SingleCard = ({id,
    type,
    status,
    serial,
    launches,
    last_update,
    land_landings,
    water_landings,
    reuse_count,
    original_launch,}) => {
        console.log(type)
  return (
    <Box>
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
    </Box>
  )
}

export default SingleCard