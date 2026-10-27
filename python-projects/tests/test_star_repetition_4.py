import unittest

from support import run_solution


class StarRepetition4Test(unittest.TestCase):
    def test_case_01_python(self):
        """Python."""
        result = run_solution('star-repetition-4', 'Python')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Py**on\n')

    def test_case_02_hello(self):
        """Hello."""
        result = run_solution('star-repetition-4', 'Hello')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'He*lo\n')

    def test_edge_01_four_character_word(self):
        """Four-character word."""
        result = run_solution('star-repetition-4', 'Word')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Word\n')

    def test_edge_02_two_character_word(self):
        """Two-character word."""
        result = run_solution('star-repetition-4', 'Hi')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'HiHi\n')


if __name__ == "__main__":
    unittest.main()
