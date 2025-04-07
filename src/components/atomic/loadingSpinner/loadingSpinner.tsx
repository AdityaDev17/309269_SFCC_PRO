import { LoaderCircle, LucideProps } from 'lucide-react';
import styles from './loadingSpinner.module.css';

export interface IProps extends LucideProps {
  className?: string;
}

const LoadingSpinner = ({ className, ...props }: IProps) => {
  return (
    <LoaderCircle
      className={`${styles.spinner} ${className ? className : ''}`}
      {...props}
    />
  );
};

export default LoadingSpinner;