import { Component, ErrorInfo, ReactElement } from 'react'

type Props = {
  children: ReactElement
  FallbackComponent: ReactElement
}

class ErrorBoundary extends Component<Props, { hasError: boolean }> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true }
  }
  componentDidMount() {
    window.addEventListener('unhandledrejection', this.onUnhandledRejection)
  }
  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.onUnhandledRejection)
  }
  onUnhandledRejection = (event: PromiseRejectionEvent) => {
    event.promise.catch((error) => {
      this.setState(ErrorBoundary.getDerivedStateFromError(error))
    })
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log({ error, errorInfo })
  }
  render() {
    const { children, FallbackComponent } = this.props

    if (this.state.hasError) {
      return FallbackComponent
    }
    return children
  }
}

export default ErrorBoundary
