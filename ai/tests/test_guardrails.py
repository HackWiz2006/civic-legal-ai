from civic_ai.main import DISCLAIMER, build_placeholder_answer


def test_disclaimer_is_explicit() -> None:
    assert "not legal advice" in DISCLAIMER.lower()


def test_missing_jurisdiction_is_disclosed() -> None:
    answer = build_placeholder_answer("How do I file this form?", "unspecified")
    assert "jurisdiction was not provided" in answer
