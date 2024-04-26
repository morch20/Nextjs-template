import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
    it("should have Docs text", () => {
        render(<Home />); // Arrange

        const myElement = screen.getByText("Docs"); // Act

        expect(myElement).toBeInTheDocument(); // Assert
    });
});
