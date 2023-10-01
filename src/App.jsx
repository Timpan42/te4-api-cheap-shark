
import { useEffect, useState } from 'react'
import './App.css'
import Spinner from './componets/Spinner'


function App() {

  const [stores, setStores] = useState([])
  const [search, setSearch] = useState()
  const [searchResult, setSearchResult] = useState([])
  const [pricing, setPricing] = useState([])


  function callFunction() {

    const searchValue = document.getElementById('newSearch').value

    setSearch(searchValue)

    fetchStores()

    // gets the stores name and ip
    function fetchStores() {
      console.log("get Stores")
      fetch(`https://www.cheapshark.com/api/1.0/stores`)
        .then(res => res.json())
        .then(result => {
          console.log(result)
          setStores(result)
        }).catch(err => {
          console.log(err)
        })
    }

    fetchSearch()

    // get the search item 
    function fetchSearch() {
      console.log("get Search")
      console.log(search)
      fetch(`https://www.cheapshark.com/api/1.0/games?title=${search}`)
        .then(res => res.json())
        .then(result => {
          console.log(result)
          setSearchResult(result)
        }).catch(err => {
          console.log(err)
        })
    }

    fetchPrices()

    // gets the pricing 
    function fetchPrices() {
      console.log("get Prices")
      fetch(`https://www.cheapshark.com/api/1.0/games?id=${searchResult[0].gameID}`)
        .then(res => res.json())
        .then(result => {
          console.log(result)
          setPricing(result)
        }).catch(err => {
          console.log(err)
        })
    }
  }


  return (
    <>
      <article className='container'>
        <h1> When a person searches for a game the best deals shows</h1>
        <h2> Using <a href="https://apidocs.cheapshark.com/#intro">CheapSharks API</a> </h2>
        <input id="newSearch" type="text" />
        <button onClick={() => callFunction()}>Search</button>

        {pricing.info ? (
          <>
            <div>
              <p>
                Game name: {pricing.info.title}
              </p>
              <p>
                Game price: {pricing.deals[0].price}
              </p>
              <p>
                Game price: {stores[pricing.deals[0].storeID].storeName}
              </p>

            </div>

          </>
        ) : (
          <Spinner />
        )
        }

      </article>
    </>
  )
}

export default App
