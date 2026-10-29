import unittest

from support import run_solution


class CountTheVowelsTest(unittest.TestCase):
    def test_case_01_mixed_case(self):
        """mixed case."""
        result = run_solution('count-the-vowels', 'Practice\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '3\n')

    def test_case_02_all_uppercase(self):
        """all uppercase."""
        result = run_solution('count-the-vowels', 'AEIOU\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0\n')

    def test_case_03_with_a_space(self):
        """with a space."""
        result = run_solution('count-the-vowels', 'Hello World\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '3\n')


if __name__ == "__main__":
    unittest.main()
