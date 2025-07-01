import { Mail, MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/atomic/Button/Button";
import styles from "./page.module.css";

const NeedAssistance = () => {
	return (
		<div className={styles.assistanceBox}>
			<h2 className={styles.assistanceHeading}>NEED MORE ASSISTANCE?</h2>

			<div className={styles.assistanceSectionSpacing}>
				<div>
					<p className={styles.assistanceText}>Reach out to us on :</p>
					<div className={styles.assistanceBoxDark}>
						<Phone className="h-5 w-5" />
						<span>+44 20 4410 4422</span>
					</div>
					<p className={styles.assistanceSubtext}>
						Monday to Saturday from 9 am to 6:30 pm.
					</p>
				</div>

				<div>
					<p className={styles.assistanceText}>Write to us at :</p>
					<div className={styles.assistanceBoxDark}>
						<Mail className="h-5 w-5" />
						<span>support.elenor@abc.com</span>
					</div>
					<p className={styles.assistanceSubtext}>We usually revert in 12hrs</p>
				</div>

				<div>
					<p className={styles.assistanceText}>Chat with our assistant :</p>
					<Button className={styles.assistanceButton}>
						<MessageSquare className="h-5 w-5" />
						<span>SEND MESSAGE</span>
					</Button>
					<div className={styles.statusIndicator}>
						<div className={styles.statusDot}>.</div>
						<span className={styles.statusText}>Online</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NeedAssistance;
