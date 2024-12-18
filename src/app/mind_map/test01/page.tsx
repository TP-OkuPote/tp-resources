"use client";

import { useState } from "react";
import styles from "./styles.module.css";

interface TreeNode {
	id: number;
	children: TreeNode[];
}

export default function Test01() {
	const [tree, setTree] = useState<TreeNode>({ id: 0, children: [] });
	const [nextId, setNextId] = useState(1);

	const handleClick = (node: TreeNode) => {
		setTree((prevTree) => {
			const newChild = { id: nextId, children: [] };
			setNextId((prevId) => prevId + 1);

			const updateTree = (currentNode: TreeNode): TreeNode => {
				if (currentNode.id === node.id) {
					return {
						...currentNode,
						children: [...currentNode.children, newChild],
					};
				}
				return {
					...currentNode,
					children: currentNode.children.map(updateTree),
				};
			};

			return updateTree(prevTree);
		});
	};

	const renderNode = (node: TreeNode) => (
		<div key={node.id} className={styles.parent}>
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
			<div className={styles.box} onClick={() => handleClick(node)}>
				testText {node.id}
			</div>
			<div className={styles.children}>{node.children.map(renderNode)}</div>
		</div>
	);

	return <main>{renderNode(tree)}</main>;
}

// biome-ignore lint/complexity/noUselessLoneBlockStatements: <explanation>
{
	/* <main>
	<div className={styles.parent}>
		<div className={styles.box}>testText</div>
		<div className={styles.children}>
			<div className={styles.parent}>
				<div className={styles.box}>testText</div>
				<div className={styles.children}>
					<div className={styles.parent}>
						<div className={styles.box}>testText</div>
						<div className={styles.children}></div>
					</div>
					<div className={styles.parent}>
						<div className={styles.box}>testText</div>
						<div className={styles.children}></div>
					</div>
					<div className={styles.parent}>
						<div className={styles.box}>testText</div>
						<div className={styles.children}></div>
					</div>
					<div className={styles.parent}>
						<div className={styles.box}>testText</div>
						<div className={styles.children}></div>
					</div>
				</div>
			</div>
			<div className={styles.parent}>
				<div className={styles.box}>testText</div>
				<div className={styles.children}></div>
			</div>
			<div className={styles.parent}>
				<div className={styles.box}>testText</div>
				<div className={styles.children}></div>
			</div>
		</div>
	</div>
</main>; */
}
