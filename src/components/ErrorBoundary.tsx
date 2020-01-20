import React from 'react'
import ErrorPage from './ErrorPage'

interface IErrorBoundaryProps {
  children: React.ReactNode
}
export class ErrorBoundary extends React.Component<
  IErrorBoundaryProps,
  { hasError: boolean }
> {
  constructor(props: IErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    console.error(error)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <ErrorPage
          status='500'
          title='An internal error occured.'
          subTitle='Refresh the page'
        />
      )
    }

    return this.props.children
  }
}
