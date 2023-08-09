import { afterEach, describe, expect, it } from "vitest"
import { cleanup, render, fireEvent, screen } from "@testing-library/react"

import FormLogin from "./FormLogin.jsx"

function getFormRender() {
  return render(<FormLogin />)
}

const goodData = {
  email: "test@gmail.com",
  password: "test123",
}

const badData = {
  email: "testgmail.com",
  password: "test"
}

describe("FormLogin", () => {
  afterEach(cleanup)

  it("render contents", () => {
    const component = getFormRender()

    component.getByText("Login")
    component.getByText("Email")
    component.getByText("Password")
  })

  it("should not do anything if click the submit button with the inputs empty", async () => {
    const component = getFormRender()

    // component.debug()

    const submitButton = component.container.querySelector('button')
    submitButton.click()
  })

  it('email input should be required and not empty', async () => {
    const component = getFormRender()
    
    const emailInput = component.container.querySelector("#email")

    expect(emailInput).toBeTruthy()
    expect(emailInput.textContent).toBe("")
    expect(emailInput.type).toBe("email")
    expect(emailInput.required).toBe(true)
  })

  it('password input should be required, not empty and with 6 minlength', async () => {
    const component = getFormRender()
    
    const passwordInput = component.container.querySelector("#password")

    expect(passwordInput).toBeTruthy()
    expect(passwordInput.textContent).toBe("")
    expect(passwordInput.type).toBe("password")
    expect(passwordInput.required).toBe(true)
  })

  it('password value should be min length greater than 6', async () => {
    const component = getFormRender()

    const passwordInput = component.container.querySelector("#password")

    passwordInput.textContent = goodData.password

    expect(passwordInput.textContent.length).toBeGreaterThanOrEqual(6)
  })

  it('should write the data in the inputs', async () => {
    const component = getFormRender()

    const emailInput = component.container.querySelector("#email")
    const passwordInput = component.container.querySelector("#password")

    emailInput.textContent = goodData.email
    passwordInput.textContent = goodData.password

    expect(emailInput.textContent).toBe(goodData.email)
    expect(passwordInput.textContent).toBe(goodData.password)
  })
})
