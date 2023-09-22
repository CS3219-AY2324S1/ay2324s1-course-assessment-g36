import { useState, useEffect} from "react"

export default function TestApi() {

  async function fetchData() {
    return await fetch('http://localhost:3001/users')
  }

  useEffect(() => {
    console.log('calling API')
    try {
      fetchData();
      console.log('api called successfully.')
    } catch (e) {
      console.log("failed to catch")
    }
  }, [])

  return <div>
    Test API
  </div>

}