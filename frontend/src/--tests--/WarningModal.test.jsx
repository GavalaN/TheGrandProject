import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import WarningModal from "../Components/WarningModal"

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
  return ({ children, onClick, style, variant }) => (
    <button data-testid="warning-button" onClick={onClick} className={variant} style={style}>
      {children}
    </button>
  )
})

describe("WarningModal", () => {
  const onClose = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("Figyelmeztető ablak megfelelően renderelődik", () => {
    render(<WarningModal onClose={onClose} />)

    expect(screen.getByTestId("modal")).toBeInTheDocument()
    expect(screen.getByTestId("modal-title")).toHaveTextContent("Figyelmeztetés!")
    expect(screen.getByText(/A weboldalon megtalálhatók fiktív, vagyis kitalált adatok!/)).toBeInTheDocument()
    expect(screen.getByTestId("warning-button")).toHaveTextContent("Megértettem!")
  })

  it("Gombra kattintva meghívja az onClose-t", () => {
    render(<WarningModal onClose={onClose} />)

    fireEvent.click(screen.getByTestId("warning-button"))
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})

