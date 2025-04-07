import React from "react";
import { render } from "@testing-library/react";
import Typography from "@/components/atomic/Typography/Typography";



describe("TypographyBlock Component", () => {
  it("renders correctly with HeadLine variant", () => {
    render(<Typography type="Headline" variant={1} />);
  });
  it("renders correctly with Body variant", () => {
    render(<Typography type="Body" variant={1} />);
  });
  it("renders correctly with Label variant", () => {
    render(<Typography type="Label" variant={1} />);
  });
  it("renders correctly with Label variant", () => {
    render(<Typography type="Label" variant={3} label="Hello" />);
  });

});
