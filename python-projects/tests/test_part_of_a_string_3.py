import unittest

from support import run_solution


class PartOfAString3Test(unittest.TestCase):
    def test_case_01_python(self):
        """Python."""
        result = run_solution('part-of-a-string-3', 'Python')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'th\n')

    def test_case_02_hello(self):
        """Hello."""
        result = run_solution('part-of-a-string-3', 'Hello')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'l\n')

    def test_edge_01_four_character_word(self):
        """Four-character word."""
        result = run_solution('part-of-a-string-3', 'Word')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '\n')

    def test_edge_02_three_character_word(self):
        """Three-character word."""
        result = run_solution('part-of-a-string-3', 'abc')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '\n')


if __name__ == "__main__":
    unittest.main()
