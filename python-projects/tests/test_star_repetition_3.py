import unittest

from support import run_solution


class StarRepetition3Test(unittest.TestCase):
    def test_case_01_hello(self):
        """hello."""
        result = run_solution('star-repetition-3', 'hello\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'h***o\n')

    def test_case_02_abc(self):
        """abc."""
        result = run_solution('star-repetition-3', 'abc\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'a*c\n')

    def test_edge_01_two_characters(self):
        """Two characters."""
        result = run_solution('star-repetition-3', 'Hi\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Hi\n')

    def test_edge_02_one_character(self):
        """One character."""
        result = run_solution('star-repetition-3', 'a\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'aa\n')

    def test_edge_03_empty_line(self):
        """Empty line."""
        result = run_solution('star-repetition-3', '\n')
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('IndexError', result.stderr)
        self.assertEqual(result.stdout, "")


if __name__ == "__main__":
    unittest.main()
