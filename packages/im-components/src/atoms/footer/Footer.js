import { Container, Wrapper, Row, Column, Link, Title } from "imcomponents/atoms/footer/styles/footer";

function Footer(props) {
    const { children, ...restProps} = props;
    return <Container {...restProps}>{children}</Container>
}

Footer.Wrapper = function FooterWrapper(props) {
    const { children, ...restProps} = props;
    return <Wrapper {...restProps}>{children}</Wrapper>
}

Footer.Row = function FooterRow(props) {
    const { children, ...restProps} = props;
    return <Row {...restProps}>{children}</Row>
}

Footer.Column = function FooterColumn(props) {
    const { children, ...restProps} = props;
    return <Column {...restProps}>{children}</Column>
}

Footer.Link = function FooterLink(props) {
    const { children, ...restProps} = props;
    return <Link {...restProps}>{children}</Link>
}

Footer.Title = function FooterTitle(props) {
    const { children, ...restProps} = props;
    return <Title {...restProps}>{children}</Title>
}

export default Footer;