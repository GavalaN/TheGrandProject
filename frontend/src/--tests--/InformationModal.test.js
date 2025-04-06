"use client"
import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import InformationModal from "../Components/InformationModal"

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
  return ({ children, onClick, variant }) => (
    <button data-testid="modal-button" onClick={onClick} className={variant}>
      {children}
    </button>
  )
})

describe("InformationModal", () => {
  const defaultProps = {
    title: "Test Title",
    text: "Test Text",
    theme: "information",
    show: true,
    onClose: jest.fn(),
  }

  it("renders correctly with given props", () => {
    render(<InformationModal {...defaultProps} />)

    expect(screen.getByTestId("modal")).toBeInTheDocument()
    expect(screen.getByTestId("modal-title")).toHaveTextContent("Test Title")
    expect(screen.getByText("Test Text")).toBeInTheDocument()
    expect(screen.getByTestId("modal-button")).toBeInTheDocument()
  })

  it("does not render when show is false", () => {
    render(<InformationModal {...defaultProps} show={false} />)

    expect(screen.queryByTestId("modal")).not.toBeInTheDocument()
  })

  it("applies the correct theme class", () => {
    render(<InformationModal {...defaultProps} />)

    expect(screen.getByTestId("modal")).toHaveClass("information")
  })

  it("applies error theme when specified", () => {
    render(<InformationModal {...defaultProps} theme="error" />)

    expect(screen.getByTestId("modal")).toHaveClass("error")
  })

  it("calls onClose when close button is clicked", () => {
    render(<InformationModal {...defaultProps} />)

    fireEvent.click(screen.getByTestId("modal-button"))
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
  })

  it("does not render header when title is empty", () => {
    render(<InformationModal {...defaultProps} title="" />)

    expect(screen.queryByTestId("modal-title")).not.toBeInTheDocument()
  })
})

