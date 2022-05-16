interface Props {
    extraClasses: string
    children: React.ReactNode
}

const PageHeading: React.FC<Props> = ({ children, extraClasses }) => {
    const classes = 'text-4xl text-sky-600 font-semibold ' + extraClasses

    return <h1 className={classes}>{children}</h1>
}

export default PageHeading
