'use client';
import React, { useState } from 'react';
import {
  Accordion as AccordionWrapper,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/molecules/Accordion/AccordionWrapper';
import CheckBox from '@/components/atomic/CheckBox/CheckBox'; 
import Input from '@/components/atomic/Input/Input';  
import { Button } from '@/components/atomic/Button/Button';
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
  } from "@/components/atomic/Select/Select";

import styles from './Contact.module.css'; 
import Breadcrumbs from '@/components/atomic/Breadcrumbs/Breadcrumbs';

const ContactInfoPage = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("+91 9819819000");
  const [email, setEmail] = useState("johnsmith@abc.com");

  const handleEditClick = () => {
    setIsEditable(true);
  };

  
  const handleCancelClick = () => {
    setEmail("johnsmith@abc.com");
    setPhoneNumber("+91 9819819000"); 
    setIsEditable(false);
  };

  
  const handleUpdateClick = () => {
    setIsEditable(false);
    
  };
  return (
    <div className={styles.pageBackground}>
        
        <Breadcrumbs
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "My Account", href: "/my-account" },
          { label: "Contact & Preferences" },
        ]}
        
      />
    <div className={styles.contactPreferences}>
    
      <h1 className={styles.heading}>Contact Preferences</h1>

      <AccordionWrapper type="multiple">
        <AccordionItem value="track-orders">
          <AccordionTrigger className={styles.accordionTrigger}>Track Orders on WhatsApp</AccordionTrigger>
          <AccordionContent className={styles.accordionContent}>
            <div className={styles.section}>
              <label className={styles.checkboxContainer}>
              <CheckBox defaultChecked />
              <span>Receive order notifications on WhatsApp</span>
              </label>

              <div className={styles.notificationRow}>
                <p className={styles.notificationText}>
                  WhatsApp notifications are currently being sent to:
                </p>
                <div className={styles.phoneRow}>
                <Input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)} 
                      className={styles.phoneInput}
                      readOnly={!isEditable} 
                />
                 {!isEditable ? (
                      <Button
                        variant="secondary"
                        className={styles.editButton}
                        onClick={handleEditClick}
                      >
                        Edit
                      </Button>
                    ) : (
                      <div className={styles.buttonGroup}>
                        <Button
                          variant="secondary"
                          className={styles.updateButton}
                          onClick={handleUpdateClick}
                        >
                          Update
                        </Button>
                        <Button
                          className={styles.cancelButton}
                          onClick={handleCancelClick}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                </div>
              </div>

              <label className={styles.checkboxContainer}>
              <CheckBox defaultChecked />
              <span>I wish to receive promotions & personalized recommendations on WhatsApp</span>
              </label>

              <label htmlFor="notificationFrequency" className={styles.selectLabel}>
                    Notification Frequency
                </label>
              <div className={styles.selectWrapper}>
            
                <Select defaultValue="weekly">
                    <SelectTrigger id="notificationFrequency">
                    <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                </Select>
                </div>

            </div>
          </AccordionContent>
        </AccordionItem>

        
        <AccordionItem value="sms-preferences">
          <AccordionTrigger className={styles.accordionTrigger}>SMS Preferences</AccordionTrigger>
          <AccordionContent className={styles.accordionContent}>
          <div className={styles.section}>
          <div className={styles.notificationRow}>
                <p className={styles.notificationText}>
                  SMS notifications are currently being sent to:
                </p>
                <div className={styles.phoneRow}>
                <Input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)} 
                      className={styles.phoneInput}
                      readOnly={!isEditable} 
                />
                 {!isEditable ? (
                      <Button
                        variant="secondary"
                        className={styles.editButton}
                        onClick={handleEditClick}
                      >
                        Edit
                      </Button>
                    ) : (
                      <div className={styles.buttonGroup}>
                        <Button
                          variant="secondary"
                          className={styles.updateButton}
                          onClick={handleUpdateClick}
                        >
                          Update
                        </Button>
                        <Button
                          className={styles.cancelButton}
                          onClick={handleCancelClick}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                </div>
              </div>

              <label className={styles.checkboxContainer}>
              <CheckBox defaultChecked />
              <span>I wish to receive promotions & personalized recommendations on WhatsApp</span>
              </label>


              <label htmlFor="notificationFrequency" className={styles.selectLabel}>
                    Notification Frequency
                </label>
              <div className={styles.selectWrapper}>
                 <Select defaultValue="weekly">
                    <SelectTrigger id="notificationFrequency">
                    <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                </Select>
                </div>
          </div>
          </AccordionContent>
        </AccordionItem>

        
        <AccordionItem value="email-preferences">
          <AccordionTrigger className={styles.accordionTrigger}>Email Preferences</AccordionTrigger>
          <AccordionContent className={styles.accordionContent}>
          <div className={styles.section}>
          <div className={styles.notificationRow}>
                <p className={styles.notificationText}>
                  SMS notifications are currently being sent to:
                </p>
                <div className={styles.phoneRow}>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                      className={styles.phoneInput}
                      readOnly={!isEditable} 
                />
                 {!isEditable ? (
                      <Button
                        variant="secondary"
                        className={styles.editButton}
                        onClick={handleEditClick}
                      >
                        Edit
                      </Button>
                    ) : (
                      <div className={styles.buttonGroup}>
                        <Button
                          variant="secondary"
                          className={styles.updateButton}
                          onClick={handleUpdateClick}
                        >
                          Update
                        </Button>
                        <Button
                          className={styles.cancelButton}
                          onClick={handleCancelClick}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                </div>
              </div>

              <label className={styles.checkboxContainer}>
              <CheckBox defaultChecked />
              <span>I wish to receive promotions & personalized recommendations on WhatsApp</span>
              </label>
            
              <div className={styles.selectWrapper}>
                 <Select defaultValue="weekly">
                    <SelectTrigger id="notificationFrequency">
                    <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                </Select>
                </div>
          </div>
          </AccordionContent>
        </AccordionItem>
      </AccordionWrapper>
    </div>
    </div>
  );
};

export default ContactInfoPage;
