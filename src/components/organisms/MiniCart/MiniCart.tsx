import { Button } from '@/components/atomic/button/button';
import { DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose, Drawer } from '@/components/molecules/Drawer/Drawer';
import React from 'react'
import styles from './MiniCart.module.css'

const MiniCart = ()=>{
    return(
        <Drawer>
        <DrawerTrigger asChild><Button variant='secondary' className={styles.cartButton}>
            Add To Bag</Button></DrawerTrigger>
        <DrawerContent side="right">
          <DrawerHeader className={styles.bagHeader}>
            <DrawerTitle>BAG</DrawerTitle>
            <DrawerClose className={styles.close} asChild>
            <img
              src="images/expand.svg"
              alt="Close"
            />
          </DrawerClose>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose>Close</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
}
export default MiniCart;
