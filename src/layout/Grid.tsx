import * as React from 'react';
import * as classNames from 'classnames';

export module Grid {

    /* ===== Column ===== */

    export interface ColProps {
        width: number,
        children: React.ReactNode,
        className?: string,
        style?: React.CSSProperties
    }

    /**
     * Grid Layout Column
     * @param props React Props
     */
    export const Col = (props: ColProps) => (
        <div className={classNames('layout', 'grid', 'col', props.className)} style={{
            width: props.width * 100 + '%',
            ...props.style
        }}>
            {props.children}
        </div>
    )


    /* ===== Row ===== */

    export interface RowProps {
        children: React.ReactNode,
        className?: string,
        style?: React.CSSProperties
    }

    /**
     * Grid Layout Row
     * @param props React Props
     */
    export const Row = (props: RowProps) => (
        <div className={classNames('layout', 'grid', 'row', props.className)} style={props.style}>
            {props.children}
        </div>
    )
}
