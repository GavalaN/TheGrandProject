import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import ConfirmModal from "../Components/ConfirmModal"

// Mock FontAwesomeIcon component
jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => <div data-testid="mock-icon" />,
}))

// Mock react-bootstrap components
jest.mock("react-bootstrap/Modal", () => {
  const Modal = ({ show, onHide, children, dialogClassName }) =>
    show ? (
      <div data-testid="modal" className={dialogClassName}>
        {children}
      </div>
    ) : null
  Modal.Header = ({ children }) => <div data-testid="modal-header">{children}</div>
  Modal.Title = ({ children }) => <div data-testid="modal-title">{children}</div>
  Modal.Body = ({ children }) => <div data-testid="modal-body">{children}</div>
  Modal.Footer = ({ children }) => <div data-testid="modal-footer">{children}</div>
  return Modal
})

jest.mock("react-bootstrap/Button", () => {
  return ({ children, onClick }) => (
    <button data-testid={`button-${children}`} onClick={onClick}>
      {children}
    </button>
  )
})

describe("ConfirmModal", () => {
  const defaultProps = {
    title: "Confirm Action",
    text: "Are you sure?",
    show: true,
    onClose: jest.fn(),
    onAccept: jest.fn(),
    onReject: jest.fn(),
  }

  it("renders correctly with given props", () => {
    render(<ConfirmModal {...defaultProps} />)

    expect(screen.getByTestId("modal")).toBeInTheDocument()
    expect(screen.getByTestId("modal-title")).toHaveTextContent("Confirm Action")
    expect(screen.getByText("Are you sure?")).toBeInTheDocument()
    expect(screen.getByTestId("button-Igen")).toBeInTheDocument()
    expect(screen.getByTestId("button-Nem")).toBeInTheDocument()
  })

  it("does not render when show is false", () => {
    render(<ConfirmModal {...defaultProps} show={false} />)

    expect(screen.queryByTestId("modal")).not.toBeInTheDocument()
  })

  it("calls onAccept and onClose when accept button is clicked", () => {
    render(<ConfirmModal {...defaultProps} />)

    fireEvent.click(screen.getByTestId("button-Igen"))
    expect(defaultProps.onAccept).toHaveBeenCalledTimes(1)
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
  })

  it("calls onReject and onClose when reject button is clicked", () => {
    render(<ConfirmModal {...defaultProps} />)

    fireEvent.click(screen.getByTestId("button-Nem"))
    expect(defaultProps.onReject).toHaveBeenCalledTimes(1)
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
  })

  it("works when onAccept is not provided", () => {
    const props = { ...defaultProps, onAccept: undefined }
    render(<ConfirmModal {...props} />)

    // This should not throw an error
    fireEvent.click(screen.getByTestId("button-Igen"))
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
  })

  it("works when onReject is not provided", () => {
    const props = { ...defaultProps, onReject: undefined }
    render(<ConfirmModal {...props} />)

    // This should not throw an error
    fireEvent.click(screen.getByTestId("button-Nem"))
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
  })
})

