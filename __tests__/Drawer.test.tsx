import { render, screen, fireEvent } from '@testing-library/react';
import { Drawer, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter , DrawerTitle } from '@/components/molecules/Drawer/Drawer';

describe('Drawer Component', () => {
  it('should render the drawer with the correct content', () => {
    render(
      <Drawer>
        <DrawerTrigger>Open Drawer</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Drawer Title</DrawerTitle>
          </DrawerHeader>
          <div>Drawer content goes here</div>
          <DrawerFooter>Footer content</DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
    expect(screen.queryByText('Drawer Title')).not.toBeInTheDocument();
    expect(screen.queryByText('Drawer content goes here')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Open Drawer'));

    expect(screen.getByText('Drawer Title')).toBeInTheDocument();
    expect(screen.getByText('Drawer content goes here')).toBeInTheDocument();
  });
});
