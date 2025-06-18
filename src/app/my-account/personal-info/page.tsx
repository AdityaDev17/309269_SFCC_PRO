"use client";
import Breadcrumbs from "@/components/atomic/Breadcrumbs/Breadcrumbs";
import type { UserDetails } from "../../../common/constant";
import EditPassword from "../../../components/molecules/EditPassword/EditPassword";
import Profile from "../../../components/molecules/Profile/Profile";

import sonnerToast, {
	Toaster,
} from "../../../components/molecules/Toast/Toast";
import styles from "./PersonalInfo.module.css";

import { graphqlRequest } from "@/lib/graphqlRequest";
import { useMutation, useQuery } from "@tanstack/react-query";

const GET_CUSTOMER_DATA = `
  query Customer($customerId: ID!) {
    customer(customerId: $customerId) {
      firstName
      lastName
      email
      gender
	    birthday
      phoneHome
      addresses {
        salutation
      }
    }
  }
`;

const UPDATE_CUSTOMER = `
  mutation UpdateCustomer($input: UpdateCustomerInput!) {
    updateCustomer(input: $input) {
      firstName
      lastName
      email
      phoneHome
      gender
      birthday
	  
    }
  }
`;

const UPDATE_PASSWORD = `
  mutation UpdateCustomerPassword($input: UpdatePasswordInput!) {
    updatePassword(input: $input)
  }
`;

export default function PersonalInfoPage() {
	const customerId = sessionStorage.getItem("customer_id") ?? "";

	const { data, error, isLoading } = useQuery({
		queryKey: ["Customer", customerId],
		queryFn: () => graphqlRequest(GET_CUSTOMER_DATA, { customerId }),

		enabled: !!customerId,
	});

	const { mutate: updateCustomer } = useMutation({
		mutationFn: (input: {
			customerId: string;
			firstName: string;
			lastName: string;
			email: string;
			birthday: string;
			gender: string;
		}) => graphqlRequest(UPDATE_CUSTOMER, { input }),
		retry: 3,
	});

	// Mutation for updating password
	const { mutate: updatePassword } = useMutation({
		mutationFn: (input: {
			customerId: string;
			currentPassword: string;
			password: string;
		}) => graphqlRequest(UPDATE_PASSWORD, { input }),
		retry: 3,
	});

	const handleProfileUpdate = async (updatedData: UserDetails) => {
		try {
			const response = await updateCustomer({
				customerId,
				firstName: updatedData.firstName,
				lastName: updatedData.lastName,
				email: updatedData.email,
				birthday: updatedData.birthDate,
				gender: updatedData.gender,
			});
			console.log("Profile Updated");
			// Optionally refetch or show toast
		} catch (err) {
			console.error("Update failed", err);
		}
	};

	const handlePasswordUpdate = async ({
		currentPassword,
		password,
		confirmPassword,
	}: {
		currentPassword: string;
		password: string;
		confirmPassword: string;
	}) => {
		if (password !== confirmPassword) {
			console.error("Passwords do not match.");
			return;
		}

		try {
			const response = await updatePassword({
				customerId,
				currentPassword,
				password,
			});

			sonnerToast("Password updated successfully.", {
				className: "toast-success-class",
				unstyled: true,
			});

			console.log("Password updated:", response);
		} catch (err: unknown) {
			if (typeof err === "object" && err !== null && "graphQLErrors" in err) {
				const e = err as {
					graphQLErrors?: { extensions?: { http?: { status?: number } } }[];
				};
				const statusCode = e.graphQLErrors?.[0]?.extensions?.http?.status;

				if (statusCode === 204 || statusCode === 200) {
					sonnerToast("Password updated successfully.", {
						className: "toast-success-class",
						unstyled: true,
					});

					console.warn("Treated HTTP", statusCode, "as success:", err);
				} else {
					sonnerToast("Something went wrong.", {
						className: "toast-error-class",
						unstyled: true,
					});

					console.error("Password update failed:", err);
				}
			}
		}
	};

	const customer = data?.customer;

	const userDetails: UserDetails = {
		title: customer?.addresses?.[0]?.salutation ?? "Mr.",
		firstName: customer?.firstName ?? "",
		lastName: customer?.lastName ?? "",
		birthDate: customer?.birthday ?? "",
		gender: customer?.gender ?? "",
		email: customer?.email ?? "",
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error fetching data: {error.message}</div>;
	}

	return (
		<div className={styles.wrapper}>
			<Breadcrumbs
				breadcrumbItems={[
					{ label: "Home", href: "/" },
					{ label: "My Account", href: "/my-account" },
					{ label: "Personal Information" },
				]}
			/>
			<h2 className={styles.header}>Personal Information</h2>

			<div className={styles.gridLayout}>
				<div className={styles.column}>
					<Profile
						userDetails={userDetails}
						onUpdateClicked={handleProfileUpdate}
					/>
				</div>

				<div className={styles.divider} />

				<div className={styles.column}>
					<EditPassword onUpdateClicked={handlePasswordUpdate} />
					<Toaster />
				</div>
			</div>
		</div>
	);
}
