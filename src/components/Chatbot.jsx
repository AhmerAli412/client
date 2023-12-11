// import React, { useState } from 'react';

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [userInput, setUserInput] = useState('');

//   const handleUserInput = (e) => {
//     setUserInput(e.target.value);
//   };

//   const handleSendMessage = () => {
//     if (userInput.trim() === '') return;

//     // Add user message to the chat
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { text: userInput, sender: 'user' },
//     ]);

//     // Get chatbot response based on the user's input
//     const chatbotResponse = getChatbotResponse(userInput);
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { text: chatbotResponse, sender: 'chatbot' },
//     ]);

//     // Clear user input
//     setUserInput('');
//   };

//   const getChatbotResponse = (userInput) => {
//     const lowercaseInput = userInput.toLowerCase();

//     // Define fixed questions and their corresponding answers
//     const questionsAndAnswers = [
//       {
//         question: 'How can I earn reward coins on your website?',
//         answer: "You can earn reward coins by playing games on our website. Each game has its own reward system based on your performance and achievements",
//       },
//       {
//         question: 'What is the value of one reward coin in Ethereum?',
//         answer: 'I am doing well, thank you!The value of one reward coin is determined by the current market value of Ethereum. It may vary and can be checked in real-time on our website.',
//       },
//       {
//         question: 'How can I convert my reward coins into Ethereum coins?',
//         answer: 'To convert your reward coins into Ethereum coins, you can go to the "Convert" section on our website. There, you will find an option to exchange your reward coins for Ethereum at the current exchange rate.',
//       },
//       {
//         question: 'Can you explain the process of upgrading my NFT on your website?',
//         answer: 'To upgrade your NFT, you need to go to your accounts NFT section. There, you can choose the NFT you want to upgrade and select the desired upgrade option. Each upgrade may require a specific number of reward coins.',
//       },
//       {
//         question: 'How many levels are there for upgrading an NFT?',
//         answer: 'There are six levels available for upgrading your NFT. Each level offers enhanced features and potential value increases for your NFT.',
//       },
//       {
//         question: 'What benefits do I get by upgrading my NFT to the 6th level?',
//         answer: 'Upgrading your NFT to the 6th level unlocks various exclusive benefits such as increased rarity, enhanced abilities or attributes, special privileges, and the opportunity to list your NFT on our marketplace.',
//       },
//       {
//         question: 'How can I sell my NFT on the marketplace?',
//         answer: 'To sell your NFT on our marketplace, you need to navigate to the "Marketplace" section on our website. There, you can list your NFT for sale by setting a price and providing a detailed description. Other users can then browse and purchase your NFT.',
//       },
//       {
//         question: 'Is there a fee for selling NFTs on your marketplace?',
//         answer: 'Yes, there is a small transaction fee associated with selling NFTs on our marketplace. This fee covers the operational costs and maintenance of the platform.',
//       },
//       {
//         question: 'Can I use my reward coins to purchase NFTs on the marketplace?',
//         answer: 'Yes, you can use your reward coins to purchase NFTs listed on our marketplace. The available NFTs will display their price in both reward coins and Ethereum.',
//       },
//       {
//         question: 'Are there any restrictions on the types of games available for earning reward coins?',
//         answer: 'We offer a wide range of games on our website, each with its own reward system. However, some games may have specific eligibility criteria or requirements. You can explore our game catalog to find games that align with your preferences and eligibility.',
//       },
//       // Add more questions and answers as needed
//     ];

//     // Check if the user's input matches any of the fixed questions
//     const matchingQuestion = questionsAndAnswers.find(
//       (qa) => lowercaseInput.includes(qa.question.toLowerCase())
//     );

//     if (matchingQuestion) {
//       return matchingQuestion.answer;
//     } else {
//       return "I'm sorry, I don't understand. Can you please ask a different question?";
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-gray-100 rounded-lg overflow-hidden shadow-lg">
//       <div className="px-4 py-6">
//         <div className="chat-window">
//           {messages.map((message, index) => (
//             <div
//               key={index}
//               className={`message ${
//                 message.sender === 'user' ? 'text-right' : 'text-left'
//               }`}
//             >
//               <span className="px-2 py-1 bg-blue-500 text-white rounded">
//                 {message.text}
//               </span>
//             </div>
//           ))}
//         </div>
//         <div className="user-input flex items-center mt-4">
//           <input
//             type="text"
//             value={userInput}
//             onChange={handleUserInput}
//             className="w-full px-3 py-2 rounded border"
//             placeholder="Type your message..."
//           />
//           <button
//             onClick={handleSendMessage}
//             className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;




















import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (userInput.trim() === '') return;

    // Add user message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: userInput, sender: 'user' },
    ]);

    // Get chatbot response based on the user's input
    const chatbotResponse = getChatbotResponse(userInput);
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: chatbotResponse, sender: 'chatbot' },
    ]);

    // Clear user input
    setUserInput('');
  };

  const getChatbotResponse = (userInput) => {
    const lowercaseInput = userInput.toLowerCase();

    // Define keywords and their corresponding answers
    const keywordsAndAnswers = [
        {
          keywords: ['play', 'games'],
          answer: 'You can earn reward coins by playing games on our website. The more you play and perform well, the more reward coins you can earn.',
        },
        {
          keywords: ['reward coins', 'coins'],
          answer: 'Reward coins are our in-platform currency. You can earn them by playing games and use them for various purposes such as upgrading your NFT or converting them into Ethereum coins.',
        },
        {
          keywords: ['Ethereum coins', 'convert', 'conversion'],
          answer: 'You can convert your reward coins into Ethereum coins in the "Convert" section of our website. The conversion rate is based on the current market value of Ethereum.',
        },
        {
          keywords: ['NFT', 'upgrade'],
          answer: 'You can upgrade your NFT by visiting your account\'s NFT section. Each upgrade enhances the features and potential value of your NFT. Upgrading requires a certain number of reward coins.',
        },
        {
          keywords: ['marketplace', 'sell NFT'],
          answer: 'To sell your upgraded NFT, you can list it on our marketplace. Set a price and provide a detailed description for potential buyers. Once sold, you will receive the corresponding value in reward coins or Ethereum coins.',
        },
        {
          keywords: ['levels', 'upgrading levels'],
          answer: 'There are six levels available for upgrading your NFT. Each level offers additional benefits, increased rarity, enhanced abilities, and more. Unlock the full potential of your NFT by reaching the 6th level.',
        },
        {
            keywords: ['rewards', 'prizes'],
            answer: 'By earning reward coins, you can redeem various rewards and prizes available on our website. Check out the Rewards section to see the available options.',
          },
          {
            keywords: ['account', 'registration'],
            answer: 'To start earning reward coins and accessing the features of our website, you need to create an account. Click on the "Sign Up" button and follow the registration process to create your account.',
          },
          {
            keywords: ['balance', 'reward coin balance'],
            answer: 'You can check your current reward coin balance in your account dashboard. It will display the number of reward coins you have earned so far.',
          },
          {
            keywords: ['withdraw', 'withdrawal'],
            answer: 'Currently, you can use your reward coins within our platform for various purposes. We do not support direct withdrawal of reward coins as Ethereum coins at the moment.',
          },
          {
            keywords: ['support', 'contact', 'help'],
            answer: 'If you need any assistance or have further questions, you can contact our support team through the "Contact" page or send an email to support@yourwebsite.com. We are here to help!',
          },
          {
            keywords: ['connect', 'MetaMask account', 'metamask account'],
            answer: 'To connect your MetaMask account, click on the "Connect Wallet" button and follow the prompts. Make sure you have the MetaMask extension installed in your browser.',
          },
          {
            keywords: ['MetaMask', 'wallet', 'need' , 'metamask'],
            answer: 'MetaMask is a digital wallet that allows you to securely store and manage your Ethereum and ERC-20 tokens. You need MetaMask on our website to interact with the Ethereum blockchain, perform transactions, and withdraw your earned rewards.',
          },
          {
            keywords: ['withdraw', 'rewards', 'MetaMask' , 'metamask'],
            answer: 'To withdraw your earned rewards to your MetaMask wallet, go to the "Withdraw" section on our website. Enter the desired amount and confirm the transaction. The rewards will be transferred to your MetaMask wallet.',
          },
          {
            keywords: ['fees', 'withdraw', 'MetaMask' , 'metamask'],
            answer: 'Yes, there might be transaction fees associated with withdrawing rewards to your MetaMask wallet. These fees are determined by the Ethereum network and may vary depending on network congestion.',
          },
          {
            keywords: ['NFT', 'purchase', 'marketplace', 'MetaMask' , 'metamask'],
            answer: 'Yes, you can use your connected MetaMask wallet to purchase NFTs listed on our marketplace. Make sure you have sufficient Ethereum balance in your MetaMask wallet to complete the transaction.',
          },
          {
            keywords: ['balance', 'MetaMask wallet' , 'metamask wallet'],
            answer: 'You can view your MetaMask wallet balance by clicking on the MetaMask extension in your browser. It will display your Ethereum and token balances.',
          },
          {
            keywords: ['issues', 'MetaMask', 'website' , 'metamask'],
            answer: 'If you encounter any issues with MetaMask on our website, please make sure you have the latest version of MetaMask installed. You can also try refreshing the page or clearing your browser cache. If the issue persists, please contact our support team for assistance.',
          },
        // Add more keywords and answers as needed
      ];
      
    // Check if the user's input contains any of the keywords
    const matchingKeyword = keywordsAndAnswers.find(
        (ka) => ka.keywords.some((keyword) => lowercaseInput.includes(keyword.toLowerCase()))
      );
    
      if (matchingKeyword) {
        return matchingKeyword.answer;
      } else {
        return "I'm sorry, I don't understand. Can you please ask a different question?";
      }
    };

    return (
        <div className="max-w-md mx-auto" style={{ backgroundColor: "#1a1c1f" }}>
          <div className="bg-custom-chatBoxColor rounded-lg overflow-hidden shadow-lg px-4 py-6">
            <div className="chat-window">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex justify-end ${
                    message.sender === 'user' ? 'items-end' : 'items-start'
                  } mb-2`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-custom-userMsgBoxColor text-white'
                        : 'bg-custom-systemMsgBoxColor text-white'
                    } border border-slate-300 hover:border-slate-400`}
                    style={{ backgroundColor: message.sender === 'user' ? 'green' : '#24262b' }}
                  >
                    <span className="text-white">{message.text}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="user-input flex items-center mt-4">
              <input
                type="text"
                value={userInput}
                onChange={handleUserInput}
                className="w-full px-3 py-2 rounded border border-slate-300 hover:border-slate-400"
                placeholder="Type your message..."
              />
              <button
                onClick={handleSendMessage}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      );
      
      
      
      
};

export default Chatbot;
