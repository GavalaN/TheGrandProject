import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import SiteCookies from "../Components/SiteCookies"
import Cookies from "js-cookie"

// Mock dependencies
jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: ({ icon }) => {
    // Convert the icon name to kebab-case for the data-testid
    // This matches how FontAwesome actually names its icons
    const iconName = icon.iconName || icon
    return <div data-testid={`icon-${iconName}`} />
  },
}))

jest.mock("react-tooltip", () => ({
  Tooltip: () => <div data-testid="tooltip" />,
}))

// Fix the Modal mock to include nested components
jest.mock("react-bootstrap", () => {
  const Modal = ({ show, onHide, children, dialogClassName }) =>
    show ? (
      <div data-testid="cookies-modal" className={dialogClassName}>
        {children}
      </div>
    ) : null

  // Add the nested components to Modal
  Modal.Header = ({ children }) => <div data-testid="modal-header">{children}</div>
  Modal.Title = ({ children }) => <div data-testid="modal-title">{children}</div>
  Modal.Body = ({ children }) => <div data-testid="modal-body">{children}</div>
  Modal.Footer = ({ children }) => <div data-testid="modal-footer">{children}</div>

  return {
    Modal,
    Button: ({ children, onClick }) => (
      <button data-testid={`button-${children}`} onClick={onClick}>
        {children}
      </button>
    ),
  }
})

jest.mock("js-cookie", () => ({
  get: jest.fn(),
  set: jest.fn(),
}))

describe("SiteCookies", () => {
  // Create a mock element with style property
  const mockElement = {
    style: {
      visibility: "hidden",
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()

    // Reset the mock element's visibility
    mockElement.style.visibility = "hidden"

    // Mock document.getElementById before each test
    document.getElementById = jest.fn().mockImplementation((id) => {
      if (id === "cookies-content") {
        return mockElement
      }
      return null
    })
  })

  it("renders correctly when cookies are not accepted", () => {
    Cookies.get.mockReturnValue(undefined)

    render(<SiteCookies />)

    expect(screen.getByTestId("cookies-modal")).toBeInTheDocument()
    expect(screen.getByTestId("icon-cookie")).toBeInTheDocument()
    expect(document.getElementById).toHaveBeenCalledWith("cookies-content")
    expect(mockElement.style.visibility).toBe("hidden")
  })

  it("does not show modal when cookies are already accepted", () => {
    Cookies.get.mockReturnValue("true")

    render(<SiteCookies />)

    expect(screen.queryByTestId("cookies-modal")).not.toBeInTheDocument()
    // Fix: Use the correct icon name with hyphen
    expect(screen.getByTestId("icon-cookie-bite")).toBeInTheDocument()
  })

  it("sets cookie and updates state when accept button is clicked", () => {
    Cookies.get.mockReturnValue(undefined)

    render(<SiteCookies />)

    fireEvent.click(screen.getByTestId("button-Igen"))

    expect(Cookies.set).toHaveBeenCalledWith("accepted-cookies", true)
    expect(screen.queryByTestId("cookies-modal")).not.toBeInTheDocument()
    expect(mockElement.style.visibility).toBe("visible")
  })

  it("sets cookie and updates state when reject button is clicked", () => {
    Cookies.get.mockReturnValue(undefined)

    render(<SiteCookies />)

    fireEvent.click(screen.getByTestId("button-Nem"))

    expect(Cookies.set).toHaveBeenCalledWith("accepted-cookies", false)
    expect(screen.queryByTestId("cookies-modal")).not.toBeInTheDocument()
    expect(mockElement.style.visibility).toBe("visible")
  })

  it("shows modal when cookie settings button is clicked", () => {
    Cookies.get.mockReturnValue("true")

    render(<SiteCookies />)

    // Initially modal should not be visible
    expect(screen.queryByTestId("cookies-modal")).not.toBeInTheDocument()

    // Click the cookie settings button
    fireEvent.click(
      screen.getByText((content, element) => {
        return element.tagName.toLowerCase() === "a"
      }),
    )

    // Modal should now be visible
    expect(screen.getByTestId("cookies-modal")).toBeInTheDocument()
  })
})

