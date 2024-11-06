import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useProfileStore } from '../../store/useProfileStore';
import { AnimatedButton } from '../ui/animated-button';

export const AccountCTA = () => {
  const navigate = useNavigate();
  const { isAuthenticated, profile } = useProfileStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-8 my-12 text-center"
    >
      <h2 className="text-3xl font-bold mb-4">
        {isAuthenticated
          ? `Welcome back, ${profile?.name}!`
          : 'Start Your Investment Journey'}
      </h2>
      <p className="text-secondary-light mb-8 max-w-2xl mx-auto">
        {isAuthenticated
          ? 'Continue managing your real estate portfolio and discover new investment opportunities.'
          : 'Join thousands of investors who trust our platform for premium real estate investment opportunities.'}
      </p>
      <div className="flex justify-center gap-4">
        {isAuthenticated ? (
          <>
            <AnimatedButton
              onClick={() => navigate('/market')}
              className="btn-primary px-8 py-3"
            >
              View Markets
            </AnimatedButton>
            <AnimatedButton
              onClick={() => navigate('/profile')}
              className="btn-secondary px-8 py-3"
            >
              My Portfolio
            </AnimatedButton>
          </>
        ) : (
          <>
            <AnimatedButton
              onClick={() => navigate('/register')}
              className="btn-primary px-8 py-3"
            >
              Create Account
            </AnimatedButton>
            <AnimatedButton
              onClick={() => navigate('/login')}
              className="btn-secondary px-8 py-3"
            >
              Sign In
            </AnimatedButton>
          </>
        )}
      </div>
    </motion.div>
  );
};