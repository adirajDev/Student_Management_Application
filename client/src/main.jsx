import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/react'
import './index.css'
import App from './App.jsx'

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const root = createRoot(document.getElementById('root'))

if (!clerkPublishableKey) {
  root.render(
    <StrictMode>
      <App clerkPublishableKey={clerkPublishableKey} />
    </StrictMode>,
  )
} else {
  root.render(
    <StrictMode>
      <ClerkProvider publishableKey={clerkPublishableKey}>
        <App clerkPublishableKey={clerkPublishableKey} />
      </ClerkProvider>
    </StrictMode>,
  )
}
