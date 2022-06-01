import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <section className="grow flex justify-center items-center">
          <div className="text-red-500 dark:text-red-400 font-semibold text-3xl pt-3">
            Something went wrong... You broke the game!
          </div>
        </section>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
