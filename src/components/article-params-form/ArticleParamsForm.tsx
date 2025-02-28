import { useState, FormEvent } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

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

	const {setArticleState} = setArticleStateProps;

	const [isOpen, setOpen] = useState<boolean>(false);

	const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);

	const formChange = (formParameter: string) => {
		return(value: OptionType) => {
			setFormState({...formState, [formParameter]: value});
		};
	};

	const formReset = () => {
		return() => {setFormState(defaultArticleState)};
	};

	const formSubmit = (event: FormEvent) => {
		event.preventDefault();
		setArticleState(formState);
	}

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => {setOpen(previsOpen => !previsOpen);}} />
			<aside className={clsx(styles.container, {[styles.container_open] : isOpen})}>
				<form className={styles.form} onSubmit={formSubmit}>
					<Text size={31} weight={800} uppercase={true}>Задайте параметры</Text>
					<Select selected={formState.fontFamilyOption} 
									options={fontFamilyOptions}
									title='Шрифт'
									onChange={formChange("fontFamilyOption")}
					/>
					<RadioGroup name={formState.fontSizeOption.title}
											options={fontSizeOptions}
											selected={formState.fontSizeOption}
											title='Размер шрифта'
											onChange={formChange("fontSizeOption")}
					/>
					<Select selected={formState.fontColor} 
									options={fontColors}
									title='Цвет шрифта'
									onChange={formChange("fontColor")}
					/>
					<Separator/>
					<Select selected={formState.backgroundColor} 
									options={backgroundColors}
									title='Цвет фона'
									onChange={formChange("backgroundColor")}
					/>
					<Select selected={formState.contentWidth} 
									options={contentWidthArr}
									title={"Ширина контента"}
									onChange={formChange("contentWidth")}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить'
										htmlType='reset'
										type='clear'
										onClick={formReset()}
						/>
						<Button title='Применить'
										htmlType='submit'
										type='apply'
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
