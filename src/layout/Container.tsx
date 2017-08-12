import * as React from 'react';
import * as classNames from 'classnames';

export interface ContainerProps {
    style?: React.CSSProperties,
    className?: string,
    children: React.ReactNode
}

export const Container = (props: ContainerProps) => (
    <div className={classNames('layout', 'container')}>
        {props.children}
    </div>
)
