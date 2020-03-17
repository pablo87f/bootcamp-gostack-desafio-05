import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import {
    Loading,
    Owner,
    IssueList,
    FilterList,
    FilterOptions,
    FilterTitle,
    Title,
    Pagination,
} from './styles';

import Container from '../../components/Container';

const itensPerPage = 5;

export default class Repository extends Component {
    constructor() {
        super();
        this.state = {
            repository: {},
            issues: [],
            loading: true,
            issueState: 'all',
            page: 1,
        };
    }

    async componentDidMount() {
        const { match } = this.props;
        const repoName = decodeURIComponent(match.params.repository);

        this.loadIssues(repoName, 'all', 1);
    }

    handleChangeIssueState = e => {
        const { repository, page } = this.state;

        const { full_name: fullName } = repository;

        this.loadIssues(fullName, e.target.value, page);
    };

    loadIssues = async (repoName, issueState, page) => {
        const [repository, issues] = await Promise.all([
            api.get(`/repos/${repoName}`),
            api.get(`/repos/${repoName}/issues`, {
                params: {
                    state: issueState,
                    per_page: itensPerPage,
                    page,
                },
            }),
        ]);

        this.setState({
            repository: repository.data,
            issues: issues.data,
            loading: false,
            issueState,
            page,
        });
    };

    handleOnClickNext = () => {
        const { repository, page, issueState } = this.state;
        const { full_name: fullName } = repository;
        this.loadIssues(fullName, issueState, page + 1);
    };

    handleOnClickPrev = () => {
        const { repository, page, issueState } = this.state;
        const { full_name: fullName } = repository;
        this.loadIssues(fullName, issueState, page - 1);
    };

    render() {
        const { loading, repository, issues, issueState, page } = this.state;

        if (loading) {
            return <Loading>Carregando</Loading>;
        }

        return (
            <Container>
                <Owner>
                    <Link to="/">Voltar aos repositorios</Link>
                    <img
                        src={repository.owner.avatar_url}
                        alt={repository.owner.login}
                    />
                    <h1>{repository.name}</h1>
                    <p>{repository.description}</p>
                </Owner>
                <FilterList>
                    <Title>Filtros</Title>
                    <FilterTitle>Situação:</FilterTitle>
                    <FilterOptions onChange={this.handleChangeIssueState}>
                        <option value="all" selected={issueState === 'all'}>
                            Todas
                        </option>
                        <option value="open" selected={issueState === 'open'}>
                            Abertas
                        </option>
                        <option
                            value="closed"
                            selected={issueState === 'closed'}
                        >
                            Fechadas
                        </option>
                    </FilterOptions>
                </FilterList>
                <IssueList>
                    {issues.map(issue => (
                        <li key={String(issue.id)}>
                            <img
                                src={issue.user.avatar_url}
                                alt={issue.user.login}
                            />
                            <div>
                                <strong>
                                    <a href={issue.html_url}>{issue.title}</a>
                                    {issue.labels.map(label => (
                                        <span key={String(label.id)}>
                                            {label.name}
                                        </span>
                                    ))}
                                </strong>
                                <p>{issue.user.login}</p>
                            </div>
                        </li>
                    ))}
                    <Pagination>
                        <button
                            type="button"
                            disabled={page < 2}
                            onClick={this.handleOnClickPrev}
                        >
                            <FaArrowLeft /> anterior
                        </button>
                        <span>Página {page}</span>
                        <button type="button" onClick={this.handleOnClickNext}>
                            próxima <FaArrowRight />
                        </button>
                    </Pagination>
                </IssueList>
            </Container>
        );
    }
}

Repository.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            repository: PropTypes.string,
        }),
    }).isRequired,
    location: PropTypes.shape({
        search: PropTypes.shape({
            state: PropTypes.string,
        }),
    }),
    history: PropTypes.shape({
        push() {},
    }),
};

Repository.defaultProps = {
    location: { search: { state: 'all' } },
    history: { push: () => {} },
};
