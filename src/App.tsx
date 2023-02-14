import axios from "axios"
import { gql } from "graphql-request"
import { useEffect, useState } from "react"

const query = gql`
mutation {
  introduceSession {
    id,
    expiresAt,
    addresses {
      address
    }
  }
}
`
const queryReceived = gql`
query {
    session(id: "U2Vzc2lvbjo_QZWiDCFEl6Jglum3zoYi") {
        mails{
            rawSize,
            fromAddr,
            toAddr,
            downloadUrl,
            text,
            headerSubject
        }
    }
}
`
export default function App() {
  const [teste, SetTeste] = useState([])

  const responseAPi = async () => {
    const option = await axios.get('http://localhost:8080')
    SetTeste(option.data)
  }
  console.log("teste", teste)


  useEffect(() => {
    responseAPi()
  }, [])




  // const data = useQuery(query)
  // const dataReceived = useQueryReceived(queryReceived)

  // console.log("data", data.data)
  // console.log("Received", dataReceived.data)

  return (
    <>
      <h1>Hello Romary</h1>
      <pre>{JSON.stringify(teste, null, 2)}</pre>
      {/* <pre>{JSON.stringify(dataReceived, null, 2)}</pre> */}

    </>
  )
}


