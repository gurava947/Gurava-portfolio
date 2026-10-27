import unittest

from support import run_solution


class JoinWordsTest(unittest.TestCase):
    def test_case_01_hello_and_world(self):
        """Hello and World."""
        result = run_solution('join-words', 'Hello\nWorld\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'HelloWorld\n')

    def test_case_02_gurava_and_iah(self):
        """Gurava and iah."""
        result = run_solution('join-words', 'Gurava\niah\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Guravaiah\n')

    def test_edge_01_two_empty_lines(self):
        """Two empty lines."""
        result = run_solution('join-words', '\n\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '\n')

    def test_edge_02_unicode_words(self):
        """Unicode words."""
        result = run_solution('join-words', 'గురు\nవయ్య\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'గురువయ్య\n')


if __name__ == "__main__":
    unittest.main()
