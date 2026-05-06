import { Product, Category } from '../types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Semiconductors',
    icon: 'Cpu',
    slug: 'semiconductors',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/800c158c-c203-4f95-950e-80ab7da13069/category---semiconductors-07a3b492-1778082604730.webp'
  },
  {
    id: '2',
    name: 'Sensors',
    icon: 'Activity',
    slug: 'sensors',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/800c158c-c203-4f95-950e-80ab7da13069/category---sensors-0c82be57-1778082604480.webp'
  },
  {
    id: '3',
    name: 'Microcontrollers',
    icon: 'Microchip',
    slug: 'microcontrollers',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/800c158c-c203-4f95-950e-80ab7da13069/category---microcontrollers-0dd338a1-1778082606696.webp'
  },
  {
    id: '4',
    name: 'Power Supplies',
    icon: 'Zap',
    slug: 'power-supplies',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/800c158c-c203-4f95-950e-80ab7da13069/category---power-supplies-7cf24da7-1778082606958.webp'
  },
  {
    id: '5',
    name: 'Cables',
    icon: 'Share2',
    slug: 'cables',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/800c158c-c203-4f95-950e-80ab7da13069/category---cables-f97c07b7-1778082604953.webp'
  }
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'ATmega328P-AU Microcontroller',
    category: 'microcontrollers',
    brand: 'Microchip Technology',
    description: 'High Performance, Low Power AVR 8-Bit Microcontroller. 32KB Flash, 2KB SRAM, 1KB EEPROM.',
    price: 2.45,
    currency: 'USD',
    stock: 1250,
    sku: 'ATMEGA328P-AU-ND',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/800c158c-c203-4f95-950e-80ab7da13069/category---microcontrollers-0dd338a1-1778082606696.webp',
    specifications: {
      'Core Processor': 'AVR',
      'Core Size': '8-Bit',
      'Speed': '20MHz',
      'Connectivity': 'I2C, SPI, UART/USART',
      'Peripherals': 'Brown-out Detect/Reset, POR, PWM, WDT',
      'Number of I/O': '23'
    },
    datasheetUrl: 'https://www.microchip.com/datasheet/ATmega328P',
    rating: 4.8,
    reviewsCount: 156
  },
  {
    id: 'p2',
    name: 'STM32F405RGT6',
    category: 'microcontrollers',
    brand: 'STMicroelectronics',
    description: 'ARM Cortex-M4 32b MCU+FPU, 1MB Flash, 192KB RAM, 168MHz.',
    price: 8.75,
    currency: 'USD',
    stock: 450,
    sku: 'STM32F405RGT6-ND',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/800c158c-c203-4f95-950e-80ab7da13069/category---microcontrollers-0dd338a1-1778082606696.webp',
    specifications: {
      'Core Processor': 'ARM Cortex-M4',
      'Core Size': '32-Bit',
      'Speed': '168MHz',
      'Connectivity': 'CANbus, I2C, IrDA, LINbus, SPI, UART/USART, USB OTG',
      'Peripherals': 'Brown-out Detect/Reset, DMA, I2S, LCD, POR, PWM, WDT'
    },
    datasheetUrl: 'https://www.st.com/resource/en/datasheet/stm32f405rg.pdf',
    rating: 4.9,
    reviewsCount: 89
  },
  {
    id: 'p3',
    name: 'BME280 Humidity/Pressure Sensor',
    category: 'sensors',
    brand: 'Bosch Sensortec',
    description: 'Digital Pressure, Humidity and Temperature Sensor. Small form factor and low power consumption.',
    price: 4.20,
    currency: 'USD',
    stock: 2100,
    sku: 'BME280-ND',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/800c158c-c203-4f95-950e-80ab7da13069/category---sensors-0c82be57-1778082604480.webp',
    specifications: {
      'Sensor Type': 'Humidity, Pressure, Temperature',
      'Interface': 'I2C, SPI',
      'Voltage - Supply': '1.71 V ~ 3.6 V',
      'Output Type': 'Digital',
      'Operating Temperature': '-40°C ~ 85°C'
    },
    rating: 4.7,
    reviewsCount: 230
  },
  {
    id: 'p4',
    name: '2N2222A Transistor',
    category: 'semiconductors',
    brand: 'ON Semiconductor',
    description: 'NPN Bipolar Junction Transistor. General purpose switching and amplification.',
    price: 0.15,
    currency: 'USD',
    stock: 15000,
    sku: '2N2222A-ND',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/800c158c-c203-4f95-950e-80ab7da13069/category---semiconductors-07a3b492-1778082604730.webp',
    specifications: {
      'Transistor Type': 'NPN',
      'Current - Collector (Ic) (Max)': '600mA',
      'Voltage - Collector Emitter Breakdown (Max)': '40V',
      'Vce Saturation (Max) @ Ib, Ic': '1V @ 50mA, 500mA',
      'Current - Collector Cutoff (Max)': '10nA'
    },
    rating: 4.5,
    reviewsCount: 540
  }
];