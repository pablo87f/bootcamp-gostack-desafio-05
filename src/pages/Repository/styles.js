import styled from 'styled-components';

export const Loading = styled.div`
    color: #fff;
    font-size: 30px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

    a {
        color: #7159c1;
        font-size: 16px;
        text-decoration: none;
    }
    img {
        width: 120px;
        border-radius: 50%;
        margin-top: 20px;
    }

    h1 {
        font-size: 24px;
        margin-top: 10px;
    }

    p {
        margin-top: 5px;
        font-size: 14px;
        color: #666;
        line-height: 1.4;
        text-align: center;
        max-width: 400px;
    }
`;

export const IssueList = styled.ul`
    padding-top: 30px;
    margin-top: 30px;
    border-top: 1px solid #eee;
    list-style: none;

    li {
        display: flex;
        padding: 15px 10px;
        border: 1px solid #eee;
        border-radius: 4px;

        & * li {
            margin-top: 10px;
        }

        img {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 2px solid #eee;
        }

        div {
            flex: 1;
            margin-left: 15px;
        }

        strong {
            font-size: 16px;

            a {
                text-decoration: none;
                color: #333;
                &:hover {
                    color: #7159c1;
                }
            }

            span {
                background: #eee;
                color: #333;
                border-radius: 2px;
                font-size: 12px;
                font-weight: 600;
                height: 20px;
                padding: 3px 4px;
                margin-left: 10px;
            }
        }

        p {
            margin-top: 5px;
            font-size: 12px;
            color: #999;
        }
    }
`;

export const FilterList = styled.ul`
    flex: 1;
    color: #444;
`;

export const Title = styled.h3`
    margin-bottom: 10px;
`;

export const FilterTitle = styled.span`
    font-family: Arial, Helvetica, sans-serif;
    margin: 6px;
`;

export const FilterOptions = styled.select`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: url(http://www.webcis.com.br/images/imagens-noticias/select/ico-seta-appearance.gif)
        no-repeat #eeeeee; /* Imagem de fundo (Seta) */
    background-position: 218px center; /*Posição da imagem do background*/
    width: 250px; /* Tamanho do select, maior que o tamanho da div "div-select" */
    height: 30px; /* Altura do select, importante para que tenha a mesma altura em todo os navegadores */
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 8px;
`;
export const Pagination = styled.div`
    button {
        &[disabled] {
            color: #ccc;
            border: none;
        }
    }
`;
