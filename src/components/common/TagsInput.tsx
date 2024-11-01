import { Dispatch, SetStateAction, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { RiCloseFill } from 'react-icons/ri';
import { FiHash } from 'react-icons/fi';

export interface Tag {
	id: number;
	tag: string;
}

interface TagsInputProps {
	tags: Tag[];
	setTags: Dispatch<SetStateAction<Tag[]>>;
}

const TagsInput = ({ tags, setTags }: TagsInputProps) => {
	const [value, setValue] = useState<string>('');
	const inputRef = useRef<HTMLInputElement | null>(null);

	return (
		<Container>
			{tags.map(({ id, tag }) => (
				<Tag key={`${tag}_${id}`}>
					<FiHash size="16" />
					<span>{`${tag}`}</span>
					<button type="button" onClick={() => setTags(tags.filter(({ id: order }) => id !== order))}>
						<RiCloseFill size="16" color="var(--black)" />
					</button>
				</Tag>
			))}
			<Input
				type="text"
				value={value}
				onChange={e => setValue(e.target.value)}
				onKeyDown={e => {
					if (e.nativeEvent.isComposing) return;
					if (e.key !== 'Enter') return;

					e.preventDefault();

					const trimmedValue = value.trim();

					if (trimmedValue === '') {
						setValue('');
					} else {
						console.log(trimmedValue);
						setTags(tags => [...tags, { id: Math.max(...tags.map(({ id }) => id), 0) + 1, tag: trimmedValue }]);
						setValue('');
					}

					inputRef.current?.focus();
				}}
				placeholder="# 태그"
			/>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	padding: var(--padding-container-mobile);
	width: 100%;
	border: 1px solid var(--greyOpacity200);
	overflow-x: scroll;
`;

const Tag = styled.div`
	display: inline-flex;
	flex-wrap: nowrap;
	white-space: nowrap;
	justify-content: space-between;
	align-items: center;
	gap: 4px;
	padding: calc(var(--padding-container-mobile) / 4) calc(var(--padding-container-mobile) / 2);
	color: var(--white);
	background-color: var(--black);
	font-weight: var(--fw-semibold);
	border-radius: var(--radius-s);

	button {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		margin-left: 2px;
		min-width: 18px;
		height: 18px;
		background-color: var(--grey200);
		border-radius: var(--radius-xs);
		font-size: var(--fz-p);
	}
`;

const Input = styled.input`
	margin-left: 8px;
	min-width: 80px;
	flex-shrink: 0;
	width: 100%;
	min-height: 48px;
	font-size: var(--fz-p);
`;

export default TagsInput;
