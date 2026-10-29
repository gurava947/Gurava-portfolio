import unittest

from support import run_solution


class CountOfCharactersTest(unittest.TestCase):
    def test_case_01_a_in_apple(self):
        """a in apple."""
        result = run_solution('count-of-characters', 'apple\n97\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1\n')

    def test_case_02_s_in_ississippi(self):
        """s in Mississippi."""
        result = run_solution('count-of-characters', 'Mississippi\n115\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '4\n')


if __name__ == "__main__":
    unittest.main()
