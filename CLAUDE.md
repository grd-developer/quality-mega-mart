# Quality Mega Mart - Project Guide

## Overview
A mobile-first grocery storefront built with plain HTML, CSS, and Vanilla JavaScript.

## Project Structure
- `index.html`: Main structure and modal containers.
- `styles.css`: Warm editorial theme, animations, and responsive layout.
- `config.js`: Global store settings (WhatsApp number, delivery fee, etc.).
- `menuData.js`: Product database with image links and categories.
- `storageService.js`: LocalStorage wrapper for cart and customer details.
- `script.js`: UI logic, search, filtering, and WhatsApp order generation.

## Technical Details
- **No Bundler**: Runs directly via `file://` or any static host (Vercel).
- **Safe DOM**: Uses `createElement` and `textContent` to prevent XSS.
- **Image Fallbacks**: Robust `onerror` handling for product images.
- **Ordering**: Orders are sent directly to WhatsApp (`923007886262`).

## Commands
- **Launch**: Open `index.html` in any browser.
- **Reset**: Clear browser LocalStorage to reset the cart.
