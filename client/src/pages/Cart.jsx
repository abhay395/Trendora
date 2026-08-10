import React, { useState } from 'react';
import Stepper from '../components/Stepper';
import CartEmpty from './CartEmpty';
import CartReview from '../components/CartReview';
import CheckoutPanel from '../components/CheckoutPanel';
import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '../hooks/useCart';

export default function Cart() {
  const [step, setStep] = useState(1); // 1 = review cart, 2 = address & payment
  const { data: cart = [] } = useCart();

  if (cart.length == 0) return <CartEmpty />

  const selectedItems = cart.filter((item) => item.selected);

  return (
    <div className="bg-white min-h-screen py-8 pt-24 md:pt-28 px-4 sm:px-6 lg:px-8">
      <div className='mb-10 max-w-xl mx-auto'>
        <Stepper currentStep={step} />
      </div>
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="review"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <CartReview cart={cart} onContinue={() => setStep(2)} />
          </motion.div>
        ) : (
          <motion.div
            key="checkout"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <CheckoutPanel selectedItems={selectedItems} onBack={() => setStep(1)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
