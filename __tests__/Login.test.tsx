// __tests__/Login.test.tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Login from '../src/components/molecules/Login/Login'

describe('Login Component', () => {
  it('renders without crashing', () => {
    render(<Login onLoginClicked={jest.fn()} />)

    // Simple existence check
    expect(screen.getByText(/login/i)).toBeInTheDocument()
  })
})
