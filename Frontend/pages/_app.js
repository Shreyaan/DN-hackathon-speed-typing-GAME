import '../styles/globals.css'
import useBearerToken from '../lib/useBearerToken';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import { useState } from 'react';
export default function App({ Component, pageProps }) {
  const [bearerToken, setBearerToken] = useBearerToken('');
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  return (
    <>
     <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
      <Component
        {...pageProps}
        wpm={wpm}
        setWpm={setWpm}
        accuracy={accuracy}
        setAccuracy={setAccuracy}
        bearerToken={bearerToken}
        setBearerToken={setBearerToken}
      />
    </>
  );
}
