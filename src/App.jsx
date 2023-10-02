
import { useEffect, useState } from 'react'
import './App.css'
import Spinner from './componets/Spinner'


function App() {

  const [stores, setStores] = useState(() => {
    return JSON.parse(localStorage.getItem('stores')) || []
  })
  const [hasStores, setHasStores] = useState(() => {
    return JSON.parse(localStorage.getItem('hasStores')) || []
  })
  const [search, setSearch] = useState([])
  const [searchResult, setSearchResult] = useState([])
  const [pricing, setPricing] = useState([])

  localStorage.setItem('stores', JSON.stringify(stores))
  localStorage.setItem('hasStores', JSON.stringify(hasStores))

  // gets the stores name and id (done)
  async function fetchStores() {
    if (hasStores === 1) {
      console.log("has stores stored in localStorage")
      return
    } else {
      console.log("get Stores")
      await fetch(`https://www.cheapshark.com/api/1.0/stores`)
        .then(res => res.json())
        .then(result => {
          console.log(result)
          setStores(result)
          setHasStores(1)
        }).catch(err => {
          console.log(err)
        })
    }
  }


  // get the search item 
  async function fetchSearch() {
    const searchValue = document.getElementById('newSearch').value
    await fetchStores()
    console.log("get Search")
    await fetch(`https://www.cheapshark.com/api/1.0/games?title=${searchValue}`)
      .then(res => res.json())
      .then(result => {
        console.log(result)
        setSearchResult(result)
      }).catch(err => {
        console.log(err)
      })
  }

  // gets the pricing 
  async function fetchPrices() {
    await fetchSearch()
    console.log("get Prices")
    const result = searchResult[0].gameID
    console.log(result)
    await fetch(`https://www.cheapshark.com/api/1.0/games?id=${result}`)
      .then(res => res.json())
      .then(result => {
        console.log(result)
        setPricing(result)
      }).catch(err => {
        console.log(err)
      })
  }

  function callFunction() {
    fetchStores()
    fetchSearch()
    fetchPrices()
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
                Game price: {pricing.deals[0].price}$
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
