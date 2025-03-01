import { useState, FormEvent, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOverlayClickClose } from 'src/components/article-params-form/hooks/useOverlayClickClose';

import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

export type ArticleStateProps = {
	setArticleState: (states: ArticleStateType) => void;
};

export const ArticleParamsForm = (setArticleStateProps: ArticleStateProps) => {
	const { setArticleState } = setArticleStateProps;

	const [isFormOpen, setFormOpen] = useState<boolean>(false);

	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const changeForm = (formParameter: string) => {
		return (value: OptionType) => {
			setFormState({ ...formState, [formParameter]: value });
		};
	};

	const resetForm = () => {
		return () => {
			setFormState(defaultArticleState);
			setArticleState(defaultArticleState);
		};
	};

	const submitForm = (event: FormEvent) => {
		event.preventDefault();
		setArticleState(formState);
	};

	const formRef = useRef<HTMLFormElement | null>(null);

	useOverlayClickClose({
		isOpen: isFormOpen,
		onClose: () => setFormOpen(false),
		rootRef: formRef,
	});

	return (
		<>
			<ArrowButton
				isOpen={isFormOpen}
				onClick={() => {
					setFormOpen((previsOpen) => !previsOpen);
				}}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form className={styles.form} ref={formRef} onSubmit={submitForm}>
					<Text size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={changeForm('fontFamilyOption')}
					/>
					<RadioGroup
						name={formState.fontSizeOption.title}
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						title='Размер шрифта'
						onChange={changeForm('fontSizeOption')}
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={changeForm('fontColor')}
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={changeForm('backgroundColor')}
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						title={'Ширина контента'}
						onChange={changeForm('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={resetForm()}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
