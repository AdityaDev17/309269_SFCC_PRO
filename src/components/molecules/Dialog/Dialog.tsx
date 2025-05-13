"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import * as React from "react";
import styles from "./dialog.module.css";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ ...props }, ref) => (
	<DialogPrimitive.Overlay
		ref={ref}
		className={styles.DialogOverlay}
		{...props}
	/>
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {}
>(({ children, ...props }, ref) => (
	<DialogPortal>
		<DialogOverlay className={styles.DialogOverlay} />
		<DialogPrimitive.Content
			ref={ref}
			className={`${styles.DialogContent} ${props.className ?? ""}`}
			{...props}
		>
			{children}
			<DialogPrimitive.Close
				className={styles.DialogContentClose}
				aria-label="Close"
			>
				<X
					style={{
						height: "1rem",
						width: "1rem",
					}}
				/>
			</DialogPrimitive.Close>
		</DialogPrimitive.Content>
	</DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={`${styles.DialogHeader} ${className ?? ""}`} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={`${styles.DialogFooter} ${className ?? ""}`} {...props} />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Title
		ref={ref}
		className={`${styles.DialogTitle} ${className ?? ""}`}
		{...props}
	/>
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Description>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Description
		ref={ref}
		className={`${styles.DialogDescription} ${className ?? ""}`}
		{...props}
	/>
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
	Dialog,
	DialogPortal,
	DialogOverlay,
	DialogClose,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogDescription,
};

/**
 * ## Dialog
 *
 * The `Dialog` component is a composable, accessible modal implementation built on top of Radix UI's Dialog primitives.
 * It allows developers to render dialogs with structured headers, content areas, and footers with full control over styling and behavior.
 *
 *
 * ### Features:
 * - **Composable API**: Includes `Trigger`, `Content`, `Title`, `Description`, `Header`, and `Footer` for flexible modal layouts.
 * - **Accessible**: Leverages Radix's accessibility features like focus trapping, `aria-*` roles, and keyboard interaction.
 * - **Modular Styling**: Uses CSS Modules for styling via scoped classes like `DialogOverlay`, `DialogContent`, etc.
 * - **Custom Trigger**: Can use `asChild` to render the trigger as any valid React element (`<button>`, `<a>`, etc.).
 * - **Close Button**: Includes a built-in close button using Lucide's `X` icon inside the modal.
 *
 *
 * ### Components Exported:
 *
 * | Component             | Description |
 * |----------------------|-------------|
 * | `Dialog`             | Root provider that manages open/close state. |
 * | `DialogTrigger`      | Wraps any trigger element that opens the dialog. |
 * | `DialogContent`      | The actual modal content container. |
 * | `DialogOverlay`      | A full-screen overlay rendered behind the dialog. |
 * | `DialogClose`        | Closes the dialog programmatically. |
 * | `DialogPortal`       | Handles rendering the dialog to a React Portal. |
 * | `DialogHeader`       | Optional wrapper for dialog headers. |
 * | `DialogFooter`       | Optional wrapper for dialog footers. |
 * | `DialogTitle`        | Semantic title for the dialog, used for accessibility. |
 * | `DialogDescription`  | Semantic description of dialog content. |
 *
 *
 * ### Example Usage:
 *
 * ```tsx
 *     <Dialog>
 *       <DialogTrigger asChild>
 *         <Button>Delete</Button>
 *       </DialogTrigger>
 *
 *       <DialogContent>
 *         <DialogHeader>
 *           <DialogTitle>Are you sure?</DialogTitle>
 *           <DialogDescription>This action cannot be undone.</DialogDescription>
 *         </DialogHeader>
 *
 *         <DialogFooter>
 *           <Button variant="outline" asChild>
 *             <DialogClose>Cancel</DialogClose>
 *           </Button>
 *           <Button variant="destructive">Confirm</Button>
 *         </DialogFooter>
 *       </DialogContent>
 *     </Dialog>
 *
 * ```
 *
 *
 * ### Accessibility Considerations:
 * - Focus is automatically trapped inside the dialog while open.
 * - The dialog closes when the escape key is pressed.
 * - Includes proper ARIA roles via Radix (e.g., `role="dialog"`, `aria-labelledby`, etc.).
 * - Dialog title and description assist screen readers for clear context.
 *
 *
 * ### Styling Notes:
 * - All components use modular CSS via `dialog.module.css`.
 * - Override styles using the `className` prop when needed.
 * - Style hooks:
 *   - `.DialogOverlay` — semi-transparent backdrop
 *   - `.DialogContent` — dialog container box
 *   - `.DialogContentClose` — close icon styling
 *   - `.DialogHeader`, `.DialogFooter`, `.DialogTitle`, `.DialogDescription`
 *
 *
 * ### Challenges & Considerations:
 * - **Portal Management**: Dialog content is rendered in a portal to avoid z-index and DOM stacking issues.
 * - **Forwarded Refs**: All major subcomponents use `forwardRef` for better interop with animations and accessibility tools.
 * - **Composable Layout**: Allows custom header/footer layout by not enforcing internal layout structure.
 *
 */
