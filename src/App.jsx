import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import bitcoin from "./assets/bitcoin.jpg"
import ethereum from "./assets/ethereum.jpg"
import tether from "./assets/tether.jpg"
import xrp from "./assets/xrp.jpg"
import bnb from "./assets/bnb.jpg"
import solana from "./assets/solana.jpg"
import chartbitcoin from "./assets/bitcoinchart.jpg"
import chartethereum from "./assets/ethereumchart.jpg"
import charttether from "./assets/tetherchart.jpg"
import charxrp from "./assets/xrpchart.jpg"
import chartbnb from "./assets/bnbchart.jpg"
import chartsolana from "./assets/solanichart.jpg"
import "./App.css";


const initialAssets = [
  {
    id: 1,
    logo: bitcoin,
    name: "Bitcoin",
    symbol: "BTC",
    price: 93759.48,
    change1h: 0.43,
    change24h: 0.93,
    change7d: 11.11,
    marketCap: "1,861,618,902,186",
    volume24h: 43874950947,
    circulatingSupply: "19.85M BTC",
    maxSupply: "21M",
    chart: chartbitcoin
  },
  {
    id: 2,
    logo: ethereum,
    name: "Ethereum",
    symbol: "ETH",
    price: 1802.46,
    change1h: 0.6,
    change24h: 3.21,
    change7d: 13.68,
    marketCap: "217,581,279,327",
    volume24h: 23547469307,
    circulatingSupply: "120.71M ETH",
    maxSupply: "—",
    chart: chartethereum
  },
  {
    id: 3,
    logo: tether,
    name: "Tether",
    symbol: "USDT",
    price: 1.0,
    change1h: 0.0,
    change24h: 0.0,
    change7d: 0.04,
    marketCap: "145,320,022,085",
    volume24h: 92288882007,
    circulatingSupply: "145.27B USDT",
    maxSupply: "—",
    chart: charttether
  },
  {
    id: 4,
    logo: xrp,
    name: "XRP",
    symbol: "XRP",
    price: 2.22,
    change1h: 0.46,
    change24h: 0.54,
    change7d: 6.18,
    marketCap: "130,073,814,966",
    volume24h: 5131481491,
    circulatingSupply: "58.39B XRP",
    maxSupply: "—",
    chart: charxrp
  },
  {
    id: 5,
    logo: bnb,
    name: "BNB",
    symbol: "BNB",
    price: 606.65,
    change1h: 0.09,
    change24h: -1.2,
    change7d: 3.73,
    marketCap: "85,471,956,947",
    volume24h: 1874281784,
    circulatingSupply: "140.89M BNB",
    maxSupply: "—",
    chart: chartbnb
  },
  {
    id: 6,
    logo: solana,
    name: "Solana",
    symbol: "SOL",
    price: 151.51,
    change1h: 0.53,
    change24h: 1.26,
    change7d: 14.74,
    marketCap: "78,381,958,631",
    volume24h: 4881674486,
    circulatingSupply: "517.31M SOL",
    maxSupply: "—",
    chart: chartsolana 
  }
];


const getRandomChange = () => (Math.random() * 2 - 1).toFixed(2);

const assetSlice = createSlice({
  name: "assets",
  initialState: initialAssets,
  reducers: {
    updatePrices: (state) =>
      state.map((asset) => ({
        ...asset,
        price: +(asset.price * (1 + getRandomChange() / 100)).toFixed(2),
        change1h: +getRandomChange(),
        change24h: +getRandomChange(),
        volume24h: asset.volume24h + Math.floor(Math.random() * 1000000)
      }))
  }
});

const store = configureStore({
  reducer: {
    assets: assetSlice.reducer
  }
});

const CryptoTable = () => {
  const assets = useSelector((state) => state.assets);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(assetSlice.actions.updatePrices());
    }, 1500);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>1h %</th>
            <th>24h %</th>
            <th>7d %</th>
            <th>Market Cap</th>
            <th>Volume(24h)</th>
            <th>Circulating Supply</th>
            <th>Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset, index) => (
            <tr key={asset.id}>
              <td>{index + 1}</td>
              <td>
                <img src={asset.logo} alt={asset.symbol} width="20" style={{ verticalAlign: "middle", marginRight: "6px" }} />
                {asset.name} <strong>{asset.symbol}</strong>
              </td>
              <td>${asset.price.toLocaleString()}</td>
              <td className={asset.change1h >= 0 ? "green" : "red"}>{asset.change1h}%</td>
              <td className={asset.change24h >= 0 ? "green" : "red"}>{asset.change24h}%</td>
              <td>{asset.change7d}%</td>
              <td>${asset.marketCap}</td>
              <td>${asset.volume24h.toLocaleString()}</td>
              <td>{asset.circulatingSupply}</td>
              <td><img src={asset.chart} alt="chart" width="80" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <h1 style={{ textAlign: "center" }}>Crypto Price Tracker</h1>
    <CryptoTable />
  </Provider>
);

export default App;
