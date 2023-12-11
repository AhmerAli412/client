// import { useEffect, useState } from "react";
// import { ethers } from "ethers";

// function TransactionHistory({ marketplace, account }) {
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const loadTransactionHistory = async () => {
//     console.log("Loading transactions");
//     try {
//       if (!marketplace || !account) {
//         console.log(marketplace);
//         console.log(account);
//         return;
//       }
//       console.log(marketplace, account);
//       const purchaseFilter = marketplace.filters.Bought(
//         null,
//         null,
//         null,
//         null,
//         null,
//         account
//       );
//       const saleFilter = marketplace.filters.Offered(
//         null,
//         null,
//         null,
//         null,
//         account
//       );
//       console.log("Reached here after filters");

//       const purchaseEvents = await marketplace.queryFilter(purchaseFilter);
//       console.log("Purchase transactions are" + purchaseEvents);
//       const saleEvents = await marketplace.queryFilter(saleFilter);
//       console.log("Sale transactions are " + saleEvents);
//       console.log(saleFilter);
//       const allEvents = [...purchaseEvents, ...saleEvents];

//       const allTransactions = await Promise.all(
//         allEvents.map(async (event) => {
//           const eventData = event.args;
//           const itemId = eventData.itemId.toNumber();

//           const item = await getItemDetails(itemId);

//           return {
//             transactionType: event.name === "Bought" ? "Purchase" : "Sale",
//             itemId,
//             tokenId: eventData.tokenId.toNumber(),
//             totalPrice: await marketplace.getTotalPrice(itemId),
//             price: ethers.utils.formatEther(eventData.price),
//             name: item.name,
//             description: item.description,
//             image: item.image,
//           };
//         })
//       );

//       setTransactions(allTransactions);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error loading transaction history:", error);
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     loadTransactionHistory();
//   }, [marketplace, account]);

//   const getItemDetails = async (itemId) => {
//     const item = await marketplace.items(itemId);
//     // Replace this with fetching item details based on your contract structure
//     return {
//       name: "Item Name",
//       description: "Item Description",
//       image: "Item Image URL",
//     };
//   };

//   if (loading) {
//     return <div>Loading transaction history...</div>;
//   }

//   return (
//     <div>
//       <h2>Your Transaction History</h2>
//       <ul>
//         {transactions.map((transaction, index) => (
//           <li key={index}>
//             <p>Transaction Type: {transaction.transactionType}</p>
//             <p>Item ID: {transaction.itemId}</p>
//             <p>Token ID: {transaction.tokenId}</p>
//             <p>Total Price: {transaction.totalPrice.toString()} ETH</p>
//             <p>Price: {transaction.price.toString()} ETH</p>

//             <p>Name: {transaction.name}</p>
//             <p>Description: {transaction.description}</p>
//             <img
//               src={transaction.image}
//               alt="NFT"
//               style={{ width: "100px", height: "100px" }}
//             />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default TransactionHistory;














import { useEffect, useState } from "react";
import { ethers } from "ethers";

function TransactionHistory({ marketplace, account }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTransactionHistory = async () => {
    console.log("Loading transactions");
    try {
      if (!marketplace || !account) {
        console.log(marketplace);
        console.log(account);
        return;
      }
      console.log(marketplace, account);
      const purchaseFilter = marketplace.filters.Bought(
        null,
        null,
        null,
        null,
        null,
        account
      );
      const saleFilter = marketplace.filters.Offered(
        null,
        null,
        null,
        null,
        account
      );
      console.log("Reached here after filters");

      const purchaseEvents = await marketplace.queryFilter(purchaseFilter);
      console.log("Purchase transactions are" + purchaseEvents);
      const saleEvents = await marketplace.queryFilter(saleFilter);
      console.log("Sale transactions are " + saleEvents);
      console.log(saleFilter);
      const allEvents = [...purchaseEvents, ...saleEvents];

      const allTransactions = await Promise.all(
        allEvents.map(async (event) => {
          const eventData = event.args;
          const itemId = eventData.itemId.toNumber();

          const item = await getItemDetails(itemId);

          return {
            transactionType: event.name === "Bought" ? "Purchase" : "Sale",
            itemId,
            tokenId: eventData.tokenId.toNumber(),
            totalPrice: await marketplace.getTotalPrice(itemId),
            price: ethers.utils.formatEther(eventData.price),
            name: item.name,
            description: item.description,
            image: item.image,
          };
        })
      );

      setTransactions(allTransactions);
      setLoading(false);
    } catch (error) {
      console.error("Error loading transaction history:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    loadTransactionHistory();
  }, [marketplace, account]);

  const getItemDetails = async (itemId) => {
    const item = await marketplace.items(itemId);
    // Replace this with fetching item details based on your contract structure
    return {
      name: "Item Name",
      description: "Item Description",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDs2acvSCGAiraHEPWECE5F0BrndQUlI0KjA&usqp=CAU",
    };
  };

  if (loading) {
    return <div>Loading transaction history...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Transaction Type</th>
            <th>Item ID</th>
            <th>Token ID</th>
            <th>Total Price (ETH)</th>
            <th>Price (ETH)</th>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </td>
              <td>{transaction.transactionType}</td>
              <td>{transaction.itemId}</td>
              <td>{transaction.tokenId}</td>
              <td>{transaction.totalPrice.toString()} ETH</td>
              <td>{transaction.price.toString()} ETH</td>
              <td>{transaction.name}</td>
              <td>{transaction.description}</td>
              <td>
                <img
                  src={transaction.image}
                  alt="NFT"
                  style={{ width: "100px", height: "50px" }}
                />
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default TransactionHistory;
