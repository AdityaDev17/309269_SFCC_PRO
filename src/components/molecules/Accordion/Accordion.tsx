"use client";

import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	Accordion as AccordionWrapper,
} from "./AccordionWrapper";

type AccordionItemType = {
	title: string;
	desc: string;
};

type AccordionProps = {
	items: AccordionItemType[];
	contentStyle?: string;
};

const Accordion = ({ items, contentStyle }: AccordionProps) => {
	return (
		<AccordionWrapper type="single" collapsible>
			{items.map((item) => (
				<AccordionItem key={item.title} value={`item-${item}`}>
					<AccordionTrigger>{item.title}</AccordionTrigger>
					<AccordionContent>
						<div className={contentStyle}>{item.desc}</div>
					</AccordionContent>
				</AccordionItem>
			))}
		</AccordionWrapper>
	);
};

export default Accordion;

/**
 * ## Accordion
 *
 * A flexible and accessible accordion component used to display collapsible content sections.
 *
 *
 * ### Accordion
 * - The root wrapper component that renders the entire accordion.
 * - Accepts a `type` prop (defaulting to "single") to control the accordion's behavior (either a single collapsible item or multiple).
 * - The `collapsible` prop allows sections to be individually collapsed or expanded.
 * - Renders child components of `AccordionItem` to create the collapsible sections.
 * - Accepts `contentStyle` prop to customize the style of the content in each accordion section.
 *
 * ### AccordionItem
 * - Represents an individual accordion section.
 * - Accepts a `value` prop to uniquely identify the section.
 * - Contains the accordion trigger (header) and content components.
 *
 * ### AccordionTrigger
 * - Represents the clickable header of an accordion item.
 * - Triggers the collapsing/expanding behavior of the `AccordionContent`.
 *
 * ### AccordionContent
 * - Represents the collapsible content of an accordion item.
 * - By default, the content is hidden until the trigger is clicked.
 * - Accepts all standard props for `<div>`.
 *
 * ### Wrapper Concept
 *
 * The **Accordion** component serves as the primary wrapper for the accordion's structure and behavior. It manages the accordion's collapsible state and renders individual sections (`AccordionItem` components) based on the `items` prop.
 *
 * The `items` prop is an array of objects with `title` and `desc` properties, where `title` is the heading of the accordion section (rendered as the trigger) and `desc` is the content (rendered inside the collapsible section).
 *
 * The `AccordionWrapper` component wraps the entire accordion and handles the collapsible behavior, determining how many sections can be open at a time based on the `type` prop. By default, the accordion allows only one section to be open at a time (`type="single"`), but it can be customized for multiple open sections.
 *
 * The `AccordionItem` components use the `AccordionTrigger` and `AccordionContent` to define the clickable header and collapsible content respectively. The `contentStyle` prop can be used to customize the appearance of the content.
 *
 * ### Example Usage
 *
 * ```tsx
 * <Accordion
 *   items={[
 *     { title: "Section 1", desc: "This is the content of section 1" },
 *     { title: "Section 2", desc: "This is the content of section 2" },
 *     { title: "Section 3", desc: "This is the content of section 3" }
 *   ]}
 *   contentStyle="custom-content-style"
 * />
 * ```
 * This example renders a collapsible accordion with three sections. Each section has a `title` (rendered as a clickable trigger) and a `desc` (rendered as the collapsible content).
 *
 */
