import { Button } from "@/components/atomic/Button/Button";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import styles from "./page.module.css";

const NeedAssistance = () => {
	const t = useTranslations("FAQ");
	return (
		<div className={styles.assistanceBox}>
			<h2 className={styles.assistanceHeading}>{t("need-more-assistance")}</h2>

			<div className={styles.assistanceSectionSpacing}>
				<div>
					<p className={styles.assistanceText}>{t("reach-out-to-us-on")}</p>
					<div className={styles.assistanceBoxDark}>
						<Phone className="h-5 w-5" />
						<span>{t("phone-number")}</span>
					</div>
					<p className={styles.assistanceSubtext}>{t("monday-to-friday")}</p>
				</div>

				<div>
					<p className={styles.assistanceText}>{t("write-us")}</p>
					<div className={styles.assistanceBoxDark}>
						<Mail className="h-5 w-5" />
						<span>{t("email")}</span>
					</div>
					<p className={styles.assistanceSubtext}>{t("we-usually-revert")}</p>
				</div>

				<div>
					<p className={styles.assistanceText}>
						{t("chat-with-our-assistant")}
					</p>
					<Button className={styles.assistanceButton}>
						<MessageSquare className="h-5 w-5" />
						<span>{t("send-message")}</span>
					</Button>
					<div className={styles.statusIndicator}>
						<div className={styles.statusDot}>.</div>
						<span className={styles.statusText}>{t("online")}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NeedAssistance;
