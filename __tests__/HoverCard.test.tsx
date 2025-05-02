import React from 'react';
import { render } from '@testing-library/react';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/atomic/HoverCard/HoverCard";

describe('HoverCard Component', () => {
  it('renders without crashing', () => {
    render(<HoverCard>
        <HoverCardTrigger asChild>
          <button>Hover me</button>
        </HoverCardTrigger>
        <HoverCardContent data-testid="hover-content">
          <div>More details shown on hover</div>
        </HoverCardContent>
      </HoverCard>);
  });
});
