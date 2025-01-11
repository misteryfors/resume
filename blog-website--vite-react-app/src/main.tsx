import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/style.css'
import './App.css'
import AppRouter from "./AppRouter.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
)
